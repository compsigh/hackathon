{ config, lib, pkgs, ... }:

let
  cfg = config.services.hackathon;
in
{
  options.services.hackathon = {
    enable = lib.mkEnableOption "hackathon platform";

    package = lib.mkOption {
      type = lib.types.package;
      description = "The hackathon platform package to use.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port the hackathon server listens on.";
    };

    domain = lib.mkOption {
      type = lib.types.nullOr lib.types.str;
      default = null;
      description = "Domain name. If set, configures nginx reverse proxy with ACME SSL.";
    };

    environmentFile = lib.mkOption {
      type = lib.types.nullOr lib.types.path;
      default = null;
      description = ''
        Path to an environment file containing secrets.
        Should define: AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
      '';
    };

    database = {
      createLocally = lib.mkOption {
        type = lib.types.bool;
        default = true;
        description = "Whether to automatically create and configure a local MySQL database.";
      };

      name = lib.mkOption {
        type = lib.types.str;
        default = "hackathon";
        description = "Database name.";
      };

      user = lib.mkOption {
        type = lib.types.str;
        default = "hackathon";
        description = "Database user.";
      };

      host = lib.mkOption {
        type = lib.types.str;
        default = "localhost";
        description = "Database host.";
      };

      port = lib.mkOption {
        type = lib.types.port;
        default = 3306;
        description = "Database port.";
      };

      passwordFile = lib.mkOption {
        type = lib.types.nullOr lib.types.path;
        default = null;
        description = "Path to a file containing the database password.";
      };
    };
  };

  config = lib.mkIf cfg.enable {
    # System user and group
    users.users.hackathon = {
      isSystemUser = true;
      group = "hackathon";
      home = "/var/lib/hackathon";
      createHome = true;
    };
    users.groups.hackathon = { };

    # MySQL database (if createLocally)
    services.mysql = lib.mkIf cfg.database.createLocally {
      enable = true;
      package = lib.mkDefault pkgs.mariadb;
      ensureDatabases = [ cfg.database.name ];
      ensureUsers = [
        {
          name = cfg.database.user;
          ensurePermissions = {
            "${cfg.database.name}.*" = "ALL PRIVILEGES";
          };
        }
      ];
    };

    # Systemd service
    systemd.services.hackathon = {
      description = "Hackathon Platform";
      after = [ "network.target" ] ++ lib.optionals cfg.database.createLocally [ "mysql.service" ];
      requires = lib.optionals cfg.database.createLocally [ "mysql.service" ];
      wantedBy = [ "multi-user.target" ];

      environment = {
        NODE_ENV = "production";
        PORT = toString cfg.port;
        HOST = "127.0.0.1";
        DATABASE_URL = if cfg.database.createLocally
          then "mysql://${cfg.database.user}@${cfg.database.host}:${toString cfg.database.port}/${cfg.database.name}"
          else "mysql://${cfg.database.user}@${cfg.database.host}:${toString cfg.database.port}/${cfg.database.name}";
        AUTH_BASE_URL = if cfg.domain != null
          then "https://${cfg.domain}"
          else "http://127.0.0.1:${toString cfg.port}";
      };

      serviceConfig = {
        Type = "simple";
        User = "hackathon";
        Group = "hackathon";
        WorkingDirectory = "${cfg.package}";
        EnvironmentFile = lib.mkIf (cfg.environmentFile != null) cfg.environmentFile;

        # Run migrations before starting
        ExecStartPre = "${pkgs.nodejs_22}/bin/node ${cfg.package}/node_modules/drizzle-kit/bin.cjs migrate";
        ExecStart = "${pkgs.nodejs_22}/bin/node ${cfg.package}/build/server/index.js";

        Restart = "on-failure";
        RestartSec = 5;

        # Hardening
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        PrivateTmp = true;
        PrivateDevices = true;
        ProtectKernelTunables = true;
        ProtectKernelModules = true;
        ProtectControlGroups = true;
        RestrictSUIDSGID = true;
        ReadWritePaths = [ "/var/lib/hackathon" ];
      };
    };

    # Nginx reverse proxy (if domain is set)
    services.nginx = lib.mkIf (cfg.domain != null) {
      enable = true;
      recommendedProxySettings = true;
      recommendedTlsSettings = true;

      virtualHosts.${cfg.domain} = {
        enableACME = true;
        forceSSL = true;
        locations."/" = {
          proxyPass = "http://127.0.0.1:${toString cfg.port}";
          proxyWebsockets = true;
        };
      };
    };
  };
}
