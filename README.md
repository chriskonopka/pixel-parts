# Pixel Parts

PixelParts is collection of ready to use components for building McDermott applications.

[Documentation Site](https://glowing-engine-9jmny6m.pages.github.io/?path=/docs/about-home--docs)

## Contributing

To contribute to the Pixel Parts project, follow the steps below.

### Set Up the Local Project Environment

1. Clone the repo
2. In the root directory run: `npm install`.
3. Cd into the docs folder and run `npm install`.

### Run Storybook Docs

1. In the root directory run `npm run docs`.

## Publishing a Release Candidate

An npm release candidate (RC) is a pre-release version of a package that is almost ready for final release but needs final testing to ensure no major issues remain. It’s feature-complete and typically becomes the official release if no problems are found.

To publish a release candidate version of the Pixel Parts library, follow the steps below.

#### Merge you feature into staging

```bash
cd staging
git pull
git merge my-feature-branch
```

#### Run the prerelease script

```bash
npm run prelease
```

Running the prerelease script will:

- Bump the package version.
- Ceate a release candidate version tag (e.g `v2.3.7-rc.6`).
- Run `git push --follow-tags` to push up the new version with tags.

Once the script is done, you should see something like this in the terminal.

```bash
Writing objects: 100% (5/5), 597 bytes | 199.00 KiB/s, done.
Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote: 
remote: GitHub found 60 vulnerabilities on mwe-apps/pixel-parts's default branch (8 critical, 19 high, 24 moderate, 9 low). To find out more, visit:
remote:      https://github.com/mwe-apps/pixel-parts/security/dependabot
remote: 
To github.com:mwe-apps/pixel-parts.git
   4414384..5414e38  staging -> staging
 * [new tag]         v2.3.7-rc.6 -> v2.3.7-rc.6
```

The GitHub workflow will automatically publish the new release candidate package version to the registry.

## Publishing a New Version

Once your feature branch has been merged into the `main` branch, you can publish a new package version by following the steps below.

#### Determining the version

Major version (X.0.0)
- Introduces breaking changes
- May remove or change existing APIs
- Requires users to update their code

Minor version (0.X.0)
- Adds new features
- Backwards-compatible (no breaking changes)

Patch version (0.0.X)
- Includes bug fixes or small improvements
- No new features
- Completely safe upgrade with no breaking changes

#### Bump the version 

```bash
# Assuming your on version 2.0.0

# Bumps to 3.0.0
npm version major
# Bumbs to 2.1.0
npm version minor
# Bumbs to 2.0.1
npm version patch
```

Running the `npm version` script:
- Updates package.json and package-lock.json with the new version.
- Creates a new version tag.

#### Push with tags to GitHub

```bash
git push --follow-tags
```

This pushes the:
- Updated package.json and package-lock.json
- New version tag

The GitHub workflow will automatically publish the new package version to the registry.

## Contributors

- [Al Eicker](mailto:aleicker@mwe.com)
- [Cherinet Zewdie](mailto:czewdie@mwe.com)
- [Chris Konopka](mailto:czewdie@mwe.com)