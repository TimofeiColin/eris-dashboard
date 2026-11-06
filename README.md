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
- **Colors**:
  - Browse the colors with their hex code (shown with a swatch) and group, with page controls.
  - Filter by name, or pick a group from a dropdown. The filter is kept in the URL, e.g. `/colors?groupId=5`.
  - Create and edit colors in one form: the name needs at least 3 letters and must be unique, the hex code is checked and previewed live (`#F80` is saved as `#FF8800`), and the color must belong to a group.
  - Delete a color.
- **Sayings, Settings**: not built yet; these pages are empty placeholders.

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
| `VITE_USE_MOCK_API` | `true` uses built-in mock data instead of the real API     | `false`                      |

Restart the dev server after changing `.env`.

### Running without the backend

Set `VITE_USE_MOCK_API=true` to run against an in-memory mock API with sample groups, colors and sayings. It supports filtering, pages, creating, renaming and deleting, and takes about 400 ms to answer so loaders stay visible. Changes reset when you reload the page. Neither `VITE_API_URL` nor `VITE_API_KEY` is needed in this mode.

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
├── api/            # Data access. Import from `api/` only: it picks the real API or the mock
│   ├── contracts/  #   Types and one interface per resource (DashboardApi, ColorGroupsApi, ColorsApi)
│   ├── http/       #   Real implementations, plus client.ts (fetch wrapper: base URL, auth, JSON, errors)
│   └── mock/       #   In-memory implementations with seed data
├── components/     # Reusable UI
│   ├── button/     #   Button (primary, secondary, ghost, danger and destructive variants)
│   ├── card/       #   Stat card, can link to a page
│   ├── color-swatch/ # ColorSwatch (small square filled with a color)
│   ├── feedback/   #   DataState (loading / error / empty states), ErrorMessage
│   ├── icon/       #   Icon (any SVG, colored with the current text color)
│   ├── input/      #   TextInput, SelectInput
│   ├── loader/     #   Spinner
│   ├── modal/      #   Modal, FormModal, ListModal
│   ├── page-header/
│   ├── sidebar/
│   └── table/      #   Table, Pagination, SingleFilter, MultiFilter
├── navigation/     # Route paths
├── pages/          # One folder per page (Sayings and Settings are still single placeholder files)
│   ├── dashboard/
│   ├── groups/     #   GroupsTable, GroupFormModal (create + edit), DeleteGroupModal
│   └── colors/     #   ColorsTable, ColorFormModal (create + edit), DeleteColorModal, validation
└── hooks/          # useFetch, useListParams
```

Each folder exports what it contains through an `index.ts`, so you import from the folder, e.g. `import { Button } from '../components/button'`.

## API endpoints used

All paths are relative to `VITE_API_URL`.

| Method   | Path                              | Used for                          |
| -------- | --------------------------------- | --------------------------------- |
| `GET`    | `dashboard-stats`                 | Dashboard counts                  |
| `GET`    | `color-groups?name=&page=`        | List color groups, one page at a time |
| `GET`    | `color-group?id=` or `?name=`     | Find one group (checks for duplicate names) |
| `GET`    | `color-groups-names`              | Every group's id and name (dropdowns) |
| `POST`   | `color-groups`                    | Create a group                    |
| `PATCH`  | `color-groups/:id`                | Rename a group                    |
| `DELETE` | `color-groups/:id`                | Delete a group                    |
| `GET`    | `color?id=` or `?name=`           | Find one color (checks for duplicate names) |
| `GET`    | `colors?name=&groupId=&page=`     | List colors, one page at a time   |
| `GET`    | `colors-names?groupId=`           | Names of the colors in a group    |
| `POST`   | `colors`                          | Create a color                    |
| `PATCH`  | `colors/:id`                      | Update a color                    |
| `DELETE` | `colors/:id`                      | Delete a color                    |

## License

[MIT](LICENSE) © 2026 Colin Timofei
