const express = require('express');
const Blog = require('../models/blog');

const routes = express.Router();

///// test
routes.get('/show-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

routes.get('/all-blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blog', { profile: 'Mourad', title: 'Blog', lead: 'This is out blog page', desc: 'all of our blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        });
});



//// post a blog (post request)
routes.post('/add-blog', (req, res) => {
    let blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs/all-blogs');
        })
        .catch((err) => {
            console.log(err);
        })
});

routes.get('/create-new-blog', (req, res) => {
    res.render('create', { profile: 'Mourad', title: 'Create blog', lead: 'You are about to create a blog', desc: 'Create and post your own blogs' });
});

routes.delete('/blog/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(result => res.json({ redirect: '/blogs/all-blogs' }))
        .catch(err => console.log(err));
})

routes.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('show', { profile: 'Mourad', title: 'blog : ' + result.title, lead: result.snippet, desc: result.body, id: result.id })
        })
        .catch((err) => console.log(err))
});

module.exports = routes;