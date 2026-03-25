{
  description = "Pelindung Bumi — Astro blog dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = { self, nixpkgs, systems, ... }:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      formatter = forEachSystem (system: nixpkgs.legacyPackages.${system}.nixfmt-rfc-style);

      devShells = forEachSystem (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              git
              nodejs_22
              nodePackages.npm
              bun
            ];

            shellHook = ''
              echo "Pelindung Bumi dev environment"
              echo "Node $(node --version) | npm $(npm --version) | bun $(bun --version)"
            '';
          };
        });
    };
}
