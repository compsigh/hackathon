{
  description = "CTF Jet development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        bun = pkgs.bun;
        
        # Prisma engines for NixOS
        prismaEngines = pkgs.prisma-engines;
        
        devTools = with pkgs; [
          git
          postgresql
          curl
          wget
          typescript-language-server
          direnv
        ];
        
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            bun
            prismaEngines
          ] ++ devTools;
          
          NIXPKGS_ALLOW_UNFREE = "1";
          
          PRISMA_QUERY_ENGINE_BINARY = "${prismaEngines}/bin/query-engine";
          PRISMA_SCHEMA_ENGINE_BINARY = "${prismaEngines}/bin/schema-engine";
          PRISMA_INTROSPECTION_ENGINE_BINARY = "${prismaEngines}/bin/introspection-engine";
          PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING = "1";
        };
        
        packages = {
          inherit bun prismaEngines;
          
          default = pkgs.symlinkJoin {
            name = "ctfjet-dev";
            paths = [ bun prismaEngines ];
          };
        };
      }
    );
}
