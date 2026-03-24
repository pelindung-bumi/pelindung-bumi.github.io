{
  description = "Pelindung Bumi — Astro blog dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs = inputs @ { self, nixpkgs, ... }:
    let
      lib = nixpkgs.lib;
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      forAllSystems = lib.genAttrs supportedSystems;

      mkPkgs = system:
        import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
    in
    {
      formatter = forAllSystems (system: (mkPkgs system).nixfmt-rfc-style);

      devShells = forAllSystems (system:
        let
          pkgs = mkPkgs system;
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
