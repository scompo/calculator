# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep-a-changelog]
and this project adheres to [Semantic Versioning][sem-ver].

## [Unreleased]
### Changed
- formatted style.css

[0.0.3] - 2020/11/07
### Added
-   Added unit tests for missing functions in `calculator.js`.

### Changed
-   Moved `getOutput` from `calculator.js` to `main.js`.

## [0.0.2] - 2020-11-05
### Added
- Added this changelog file.
- Exported the styles from the `index.html` page to the `style.css` file.
- Added a unit test for `calculator.newStatus` function.
- Added documentation to a couple of functions in `calculator.js`.
Basically to test [JSDoc][jsdoc] documentation features.
- Added `test`, `doc` and `fmt` scripts to `package.json`.

### Changed
- Changed `cancel` key behaviour.
Now it deletes the accumulator if present, otherwise it resets
the whole state.
- Moved the code to the `src` directory.
- Changed the GitHub pages configuration to serve from the `gh-pages` branch.

### Fixed
- Fixed `delete` key behaviour ([issue #2][issue2]).
Now it deletes the last char from the accumulator as expected.

## [0.0.1] - 2020-11-05
### Added
- Added the `index.html` page.
- Added the `calculator.js` module with the calculator logic.
- Added the `README.md` file.
- Added the `main.js` file for the page setup.
- Setup GitHub pages to serve the application.

[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.3...HEAD
[0.0.3]: https://github.com/scompo/calculator/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/scompo/calculator/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/scompo/calculator/releases/tag/v0.0.1

[issue2]:https://github.com/scompo/calculator/issues/2
[jsdoc]: https://github.com/jsdoc/jsdoc
[keep-a-changelog]: https://keepachangelog.com/en/1.0.0/
[sem-ver]: https://semver.org/spec/v2.0.0.html
