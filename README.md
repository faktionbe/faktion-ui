# Registry

- https://registry.faktion.com/

## Usage

Visit the production build on [faktion ui](https://registry.faktion.com/) and use one of the commands. Usage & preview are available.

## Contribute

- Use composition as much as possible, this is the most scalable pattern to build complex components.
- Use context for shared state / prop drilling when things are getting complicated.
- Make sure `pnpm build` succeeds before creating a pull request
- Create your component under `registry`. Add documentation under `app/page.tsx`. Extend `registry.json` so shadcn CLI can find it.
