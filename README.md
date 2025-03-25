## Description


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Authors
Muhammad Afif Mu'tashim (mafif357@gmail.com)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MhmmdAfif30/libraryapp.git

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install express js:

   ```bash
   npm install express
   ```

4. Set up environment variables:

   Create a .env file in the root directory and add the necessary variables. Refer to the .env.example file for guidance.

5. Set up prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

## Usage

For development with auto-restart (nodemon):

```bash
npm run dev
```