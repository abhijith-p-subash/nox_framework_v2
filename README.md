# nox_framework_v2

Noex-CLI is a powerful command-line tool for creating and managing Noex applications, which are built on top of Node.js and Express. It provides a streamlined workflow for developers to create robust and scalable web applications, with built-in features for security and database management.

## Installation (NOEX-CLI)

Recommendion: Use NOEX-CLI tool: https://www.npmjs.com/package/noex-cli

To install Noex-CLI globally on your system, you can run the following command:

```npm
npm install -g noex-cli
```

Once installed, you can access Noex-CLI from any directory in your system.

## Example Commands

To Run the project:

Set up .evn file first (.env.example file provided)

```npm
npm run dev
```

Create a new Noex application:

```npm
noex new my-app

noex new Blog
```

Create new module

```npm
noex generate module_name

cd Blog

noex generate posts
```

## Installation

```npm
git clone https://github.com/sixbeeshades/nox_framework_v2.git
```

To Run the project:

Set up .evn file first (.env.example file provided)

```npm
npm run dev
```

Create new mysql module

```npm
gulp new -module module_name

cd Blog

gulp new -module posts
```

Create new mongo module

```npm
gulp new -module module_name -mongo

cd Blog

gulp new -module posts -mongo
```

## Features

### Security

Noex-CLI prioritizes security, providing best practices for authentication, data validation, and handling common security vulnerabilities like XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery). It encourages developers to use secure coding practices and follows industry standards to safeguard against potential threats.

### Scalability

Noex-CLI promotes scalability by encouraging a modular and organized code architecture. It allows developers to structure their projects in a way that makes it easy to extend and maintain, even as the application grows in complexity. The architecture facilitates the separation of concerns and supports the addition of new modules without disrupting existing functionality.

### Multi-Database Compatibility

Noex-CLI supports both MySQL and MongoDB databases, providing flexibility for developers to choose the database that best suits their project requirements.

## Noex Framework Website

Check out the official landing page of the Noex Framework for more information:

[noex.in](https://noex.in/)

## Author

Abhijith P Subash

Website: [abhijithpsubash.com](https://abhijithpsubash.com/)

## Support

If you find Noex-CLI helpful, consider buying me a coffee to support further development:

[Buy Me A Coffee](https://www.buymeacoffee.com/abhijithpsubash)

## License

[ISC](https://members.opensource.org/)
