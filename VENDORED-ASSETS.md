# Vendored browser assets

The site keeps these runtime dependencies local so pages do not need Google Fonts or code.jquery.com:

- jQuery 3.5.1: `assets/js/vendor/jquery-3.5.1.min.js`
- Public Sans v21: `static/fonts/public-sans-v21-*.woff2`
- Sora v17: `static/fonts/sora-v17-*.woff2`

The font declarations in `assets/css/fonts.css` were generated from this Google Fonts request:

`https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap`

Licenses are stored alongside the corresponding assets:

- `assets/js/vendor/LICENSE-jquery-3.5.1.txt`
- `static/fonts/LICENSE-Public-Sans.txt`
- `static/fonts/LICENSE-Sora.txt`

When updating a dependency, change its versioned filename and its reference in the Hugo partials or font stylesheet. This ensures browsers receive a new URL instead of reusing the immutable cached file.
