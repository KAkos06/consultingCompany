# Executive Insight Umbraco

The local production-like stack runs Umbraco 17 on .NET 10, SQL Server Express,
and Caddy. It is separate from the retired Node CMS stack.

## Start locally

1. Review `.env` and replace the local passwords if the stack will be shared.
2. Run `docker compose up --build`.
3. Open `http://localhost:8080` and the backoffice at `/umbraco`.

The first boot creates a fresh SQL Server database and imports the uSync
definitions/content. `BOOTSTRAP_CONTENT=true` additionally seeds a few content
items maintained in `config/bootstrap`. Set it to `false` once this initial
import has completed so backoffice edits can never be overwritten on restart.

## Existing SQLite source

`umbraco/Data/ExecutiveInsightDatabase.sqlite.db` is the original content
database. The Docker build excludes it and never changes or deletes it. Keep its
`-wal` and `-shm` files alongside it when making a manual backup.

Media is seeded once from `wwwroot/media` into the named `umbraco_media` volume.
Deleting that volume deletes the Docker copy of media; it does not delete the
working-tree source files.

## Retired services

The old Node CMS/frontend/Caddy containers were removed. Their Docker volumes
were intentionally retained for recovery and are not used by this stack.
