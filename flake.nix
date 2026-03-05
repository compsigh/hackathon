{
  description = "Hackathon platform — React Router v7 + MySQL + NixOS module";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        # Development shell
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            bun
            nodejs_22
            mysql-client
            git
            curl
            direnv
          ];

          shellHook = ''
            echo "hackathon dev shell"
          '';
        };

        # Production package
        # NOTE: Before `nix build`, generate package-lock.json:
        #   bun install && npm install --package-lock-only
        # Then update npmDepsHash with:
        #   nix hash path ./node_modules (or use lib.fakeHash to get the correct one from the error)
        packages.default = pkgs.buildNpmPackage {
          pname = "hackathon";
          version = "0.1.0";
          src = ./.;

          # Replace with real hash after first build attempt
          npmDepsHash = pkgs.lib.fakeHash;

          nodejs = pkgs.nodejs_22;

          buildPhase = ''
            npm run build
          '';

          installPhase = ''
            mkdir -p $out
            cp -r build $out/build
            cp -r node_modules $out/node_modules
            cp package.json $out/
            cp -r drizzle $out/drizzle 2>/dev/null || true
          '';

          meta = {
            description = "Hackathon platform";
          };
        };
      }
    ) // {
      nixosModules.default = import ./nix/module.nix;
    };
}
