{
  inputs = {
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    flake-utils.url = "github:numtide/flake-utils";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-substituters = [
      "https://devenv.cachix.org"
    ];
    extra-trusted-public-keys = [
      "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw="
    ];
  };

  outputs = inputs @ { flake-utils, nixpkgs, devenv, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = devenv.lib.mkShell {
          inherit inputs pkgs;

          modules = [
            ({ pkgs, ... }: {
              packages = with pkgs; [
                curl
              ];

              languages.javascript.enable = true;
              languages.javascript.bun.enable = true;
              languages.javascript.bun.install.enable = true;

              enterShell = ''
                echo "Pelindung Bumi devenv shell"
                echo "- bun install runs automatically via devenv"
                echo "- bun run dev"
                echo "- bun run build"
                echo "- bun run preview"
              '';
            })
          ];
        };
      });
}
