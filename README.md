# 🔻 contentful to markdown converter

_Simple script to convert my [Contentful][1] blog posts to pure [Markdown][2]._

## 🥑 Usage

Clone the repository and install the dependencies.

```
git clone https://github.com/bradgarropy/contentful-to-markdown.git
cd contentful-to-markdown
npm install
```

Create a `.env` file with your Contentful information.  
You can find more information about Contentful authentication [here][3].

```
# .env

CONTENTFUL_SPACE_ID=<space_id>
CONTENTFUL_PREVIEW_API_ACCESS_TOKEN=<access_token>
```

Now run! All Contentful posts will be exported to a `markdown` directory.

```
npm start
```

[1]: https://www.contentful.com
[2]: https://www.markdownguide.org
[3]: https://www.contentful.com/developers/docs/references/authentication/#the-delivery-and-preview-api
