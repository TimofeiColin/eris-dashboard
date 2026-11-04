# Eris Dashboard

A local admin dashboard for **Eris**, a Discord bot. Use it to manage the name colors members can pick, the groups those colors belong to, and the sayings Eris uses.

Built with React 19, TypeScript, Vite, Tailwind CSS 4 and React Router 7.

## Features

- **Dashboard**: shows how many color groups, colors and sayings there are. Each card links to its page.
- **Color groups**:
  - Browse the groups, with a name filter and page controls. The filter and page number are kept in the URL, e.g. `/groups?name=red&page=2`.
  - Create a group. Duplicate names are rejected.
  - Rename a group.
  - See the colors in a group.
  - Delete a group, as long as it has no colors.
- **Colors, Sayings, Settings**: not built yet; these pages are empty placeholders.

## Getting started

You need **Node.js 20+** and a running instance of the Eris API.

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Then open the URL Vite prints, usually <http://localhost:5173>.

### Environment variables

| Variable       | Description                                                   | Example                      |
| -------------- | ------------------------------------------------------------- | ---------------------------- |
| `VITE_API_URL` | Base URL of the Eris API                                      | `http://localhost:3000/api/` |
| `VITE_API_KEY` | API key, sent as `Authorization: Bearer <key>` on every request | —                            |

Restart the dev server after changing `.env`.

> **Note:** Vite builds `VITE_*` variables into the JavaScript bundle, so anyone who can load the dashboard can read the API key. This is fine for local, single-user use. Don't host the built app publicly without putting the API behind a proxy or real login first.

## Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload         |
| `npm run build`     | Type-check and build for production (`dist/`) |
| `npm run preview`   | Serve the production build locally           |
| `npm run typecheck` | Run the TypeScript compiler                  |
| `npm run lint`      | Lint with oxlint                             |

## Project structure

```
src/
├── api/            # Typed API calls (client.ts wraps fetch: base URL, auth, JSON, errors)
├── components/     # Reusable UI
│   ├── buttons/    #   Button (primary, secondary, ghost, danger and destructive variants)
│   ├── card/       #   Stat card, can link to a page
│   ├── feedback/   #   DataState (loading / error / empty states), ErrorMessage
│   ├── icon/       #   Icon (any SVG, colored with the current text color)
│   ├── inputs/     #   TextInput
│   ├── loader/     #   Spinner
│   ├── modals/     #   Modal, FormModal, ListModal
│   ├── page-header/
│   ├── sidebar/
│   └── table/      #   Table, Pagination, SingleFilter
├── navigation/     # Route paths
├── pages/          # One folder per page
│   ├── dashboard/
│   └── groups/
└── utils/          # useFetch, useDebouncedValue
```

Each folder exports what it contains through an `index.ts`, so you import from the folder, e.g. `import { Button } from '../components/buttons'`.

## API endpoints used

All paths are relative to `VITE_API_URL`.

| Method   | Path                              | Used for                          |
| -------- | --------------------------------- | --------------------------------- |
| `GET`    | `dashboard-stats`                 | Dashboard counts                  |
| `GET`    | `color-groups?name=&page=`        | List color groups, one page at a time |
| `GET`    | `color-group?name=`               | Check whether a group name exists |
| `POST`   | `color-groups`                    | Create a group                    |
| `PATCH`  | `color-groups/:id`                | Rename a group                    |
| `DELETE` | `color-groups/:id`                | Delete a group                    |
| `GET`    | `colors-by-group?groupId=`        | Colors in a group                 |

## License

[MIT](LICENSE) © 2026 Colin Timofei
