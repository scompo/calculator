# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep-a-changelog]
and this project adheres to [Semantic Versioning][sem-ver].

## [Unreleased]

## [0.0.7] - 2020/11/14
### Added
- Added icon to readme file. Thank you [cicce][cicce]!

### Changed
- Changed colors to reflect the icon. See [issue 14][issue14].

## [0.0.6] - 2020/11/10
### Added
- Added PWA configuration. (Works on chrome, not of firefox)

## [0.0.5] - 2020/11/09
### Fixed
- Fixed link for unreleased changes in changelog.
- Fixed adding of multiple dots. See [issue #9][issue9].
- Fixed error in '%' key press calling divide instead of modulus.
- Fixed browser overriding key presses with default behaviour. See [issue #11][issue11].
- Fixed typos in the changelog.

## [0.0.4] - 2020/11/07
### Added
- Added documentation to functions in `calculator.js`.

### Changed
- Formatted style.css

### Fixed
- Fixed [issue #7][issue7].

## [0.0.3] - 2020/11/07
### Added
- Added unit tests for missing functions in `calculator.js`.

### Changed
- Moved `getOutput` from `calculator.js` to `main.js`.

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

[Unreleased]: https://github.com/scompo/calculator/compare/v0.0.7...HEAD
[0.0.7]: https://github.com/scompo/calculator/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/scompo/calculator/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/scompo/calculator/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/scompo/calculator/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/scompo/calculator/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/scompo/calculator/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/scompo/calculator/releases/tag/v0.0.1

[issue14]: https://github.com/scompo/calculator/issues/14
[issue11]: https://github.com/scompo/calculator/issues/11
[issue9]: https://github.com/scompo/calculator/issues/9
[issue7]: https://github.com/scompo/calculator/issues/7
[issue2]: https://github.com/scompo/calculator/issues/2
[jsdoc]: https://github.com/jsdoc/jsdoc
[keep-a-changelog]: https://keepachangelog.com/en/1.0.0/
[sem-ver]: https://semver.org/spec/v2.0.0.html
[cicce]: https://ciccehc.threadless.com/
