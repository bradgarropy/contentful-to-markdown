require("dotenv").config()
const contentful = require("contentful")
const del = require("del")
const fs = require("fs")

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN,
    host: "preview.contentful.com",
})

const cleanup = () => {
    del.sync("markdown")
}

const getEntries = async() => {
    const entries = await client.getEntries()
    return entries.items
}

const createPost = entry => {
    const {title, slug, date, body} = entry.fields
    const {name, icon} = entry.fields.topic.fields
    const topic = `${name} ${icon}`

    const post = {
        title,
        slug,
        date,
        topic,
        body,
    }

    return post
}

const createMarkdown = post => {
    const {title, slug, date, topic, body} = post

    const lines = [
        "---",
        `title: ${title}`,
        `slug: ${slug}`,
        `date: ${date}`,
        `topic: ${topic}`,
        "---",
        "",
        `${body}`,
    ]

    const markdown = lines.join("\n")

    return markdown
}

const writeFile = (name, content) => {
    const directory = "posts"
    const path = `${directory}/${name}`
    const file = `${path}/index.md`

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true})
    }

    fs.writeFileSync(file, content)
}

const main = async() => {
    cleanup()

    const entries = await getEntries()

    entries.map(entry => {
        const contentType = entry.sys.contentType.sys.id

        if (contentType === "post") {
            const post = createPost(entry)
            const markdown = createMarkdown(post)

            console.log(post.title)
            writeFile(post.slug, markdown)
        }
    })
}

main()
