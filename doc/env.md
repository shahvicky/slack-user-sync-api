## Environment Variables

### `LOGLEVEL`

> The loglevel for the app

| Config | Value |
| --- | --- |
| Name | `loglevel` |
| Environment Variable | `LOGLEVEL` |
| Type | `enum` |
| Required | no |
| Default | `info` |
| Possible Values | `fatal`<br>`error`<br>`warn`<br>`info`<br>`debug`<br>`trace`<br>`silent`<br> |

***

### `LOGPRETTY`

> When false, JSON is logged. When true, the logs are prettier.

| Config | Value |
| --- | --- |
| Name | `logpretty` |
| Environment Variable | `LOGPRETTY` |
| Type | `boolean` |
| Required | no |
| Default | `false` |

***

### `SERVER_PORT`

> Port on which the api server runs

| Config | Value |
| --- | --- |
| Name | `server-port` |
| Environment Variable | `SERVER_PORT` |
| Type | `number` |
| Required | no |
| Default | `8000` |

***

### `SQL_DB`

> The sql database name

| Config | Value |
| --- | --- |
| Name | `sql-db` |
| Environment Variable | `SQL_DB` |
| Type | `string` |
| Required | no |
| Default | `database` |

***

### `SQL_DIALECT`

> The sql db type/dialect

| Config | Value |
| --- | --- |
| Name | `sql-dialect` |
| Environment Variable | `SQL_DIALECT` |
| Type | `string` |
| Required | no |
| Default | `mysql` |

***

### `SQL_HOST`

> The sql db hostname

| Config | Value |
| --- | --- |
| Name | `sql-host` |
| Environment Variable | `SQL_HOST` |
| Type | `string` |
| Required | no |
| Default | `localhost` |

***

### `SQL_PASS`

> The sql db password

| Config | Value |
| --- | --- |
| Name | `sql-pass` |
| Environment Variable | `SQL_PASS` |
| Type | `string` |
| Required | **yes** |
| Default | `(none)` |

***

### `SQL_PORT`

> The sql db port

| Config | Value |
| --- | --- |
| Name | `sql-port` |
| Environment Variable | `SQL_PORT` |
| Type | `number` |
| Required | no |
| Default | `3306` |

***

### `SQL_USER`

> The sql db user name

| Config | Value |
| --- | --- |
| Name | `sql-user` |
| Environment Variable | `SQL_USER` |
| Type | `string` |
| Required | **yes** |
| Default | `(none)` |

***

