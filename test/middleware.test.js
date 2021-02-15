import assert from "assert";
import { User } from "../src/user.model.js";
import { BlogPost } from "../src/blogpost.model.js";


describe('Middleware', () => {
    let testUser, testBlogPost;
    beforeEach((done) => {
        testUser = new User({
            name: 'kritagya'
        });
        testBlogPost = new BlogPost({
            title: 'KK is king',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nesciunt amet soluta, fugit totam doloribus officia at? Iste, eaque pariatur quod numquam laborum sunt autem ea sequi similique fugit dolorum.'
        });
        // reference linking (mongoose is doing heavy lifting here)
        testUser.blogPosts.push(testBlogPost);
        Promise.all([
            testUser.save(),
            testBlogPost.save()
        ]).then(() => {
            done();
        }).catch((message) => {
            console.log("CATCH BLOCK HAI YE: ", message);
        })
    });

    it('user clean up dangling blogposts on remove (on delete cascading in sql)', (done) => {
        testUser
            .deleteOne()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                console.log({count});
                assert(count === 0);
                done();
            })
    })

})