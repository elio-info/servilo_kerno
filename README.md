# Welcome to Enterprise Management System!

Business management system developed by the **MasUnoSRL** team.

# Installation

⬇️ Download the repo

```bash
$ git clone https://github.com/elio-info/servilo_kerno.git

$ gh repo clone elio-ifo/servilo_kerno
```

📂Open the folder

```bash
$ cd gestion-cultura-backend
```

🛠️ Install the dependencies

```bash
$ npm install
```

## Environment Variables ⚙️

**Before running** the project you must configure the **environment variables file** ("**.env**" file) and adding the following variables.

```javascript
###Examples###
PORT = 3000

DB_URL = "Url de Base de Datos Mongo"

LOCAL_MONGO_DEV = "Url de Base de Datos Mongo"

DB_NAME = "Nombre de la base de datos"

```

## Manage Private and Secret Key for Hashing 🔑

Generate the secret and public Key using a [RSA Key Generator](https://cryptotools.net/rsagen) and save the keys in their corresponding file (**📂 cert/key.pem** and **📂 cert/public.pem**). Can't rename the file or change the file structure.
![enter image description here](https://res.cloudinary.com/pinarecomerce/image/upload/v1706127245/tkrpq0a6fal1ymrwx7d3.png)

## Run the Project in Development Mode

Make sure the **database is accessible** from the network then run the following.

```bash
$ npm run start:dev
...
[Nest] 23589  - 24/01/2024, 11:55:45 a. m.     LOG [NestApplication] Nest application successfully started +7ms
[Nest] 23589  - 24/01/2024, 11:55:45 a. m.     LOG [MainApp] Listening on Port 3000
...
```

## Build 🚀

📦 Run the following to build the application for distribution

```bash
$ npm run build
```

Then you can find the compiled application in "**./dist 📂**"

Next step is configure the **private** and **secret key** 🔑 into the compilated project and **_voilà_** 🎉🎉

##

### MasUno S.R.L

![enter image description here](https://www.negocioscuba.cu/_next/image?url=https://s3.negocioscuba.cu/guia/files/af701280-2ba1-11ed-813d-3d242dba6beb.Logo_Simple_MasUno_75x75.svg&w=96&q=75)
