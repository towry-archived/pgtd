PGTD
----

Build a web app with Sinatra and React.

### Setup

Get a github application id on [GitHub Applications Page](https://github.com/settings/applications).

In your bash: `GITHUB_KEY=#yourkey GITHUB_SECRET=#yoursecret`

```bash
git clone https://github.com/towry/pgtd.git pgtd
cd pgtd
npm install
bundle install
foreman start -f Procfile.dev
```
