import React from 'react';

class RecipeReviewCard extends React.Component {
  state = {
    liked: false
  };

  handleUpvote = (e) => {
    if (this.state.liked) {
      return;
    }

    e.preventDefault();
    const { firebase, post } = this.props;

    firebase.ref('posts/' + post.key).set({
      author: post.author,
      message: post.message,
      image: post.image,
      upvote: post.upvote + 1
    });

    this.saveLikedInSession();
    this.setState({ liked: true });
  };

  saveLikedInSession = () => {
    let liked = window.sessionStorage.getItem('liked');
    if (!liked) {
      liked = {};
    } else {
      liked = JSON.parse(liked);
    }
    liked[this.props.post.key] = true;
    window.sessionStorage.setItem('liked', JSON.stringify(liked));
  };

  postAlreadyLiked = () => {
    let liked = window.sessionStorage.getItem('liked');
    if (!liked) {
      return false;
    }
    liked = JSON.parse(liked);
    return liked[this.props.post.key] === true;
  };

  componentWillMount() {
    if (this.postAlreadyLiked()) {
      this.setState({ liked: true });
    }
  }

  render() {
    const { post, imageLoaded } = this.props;
    const likedIcon = <i className="fa fa-heart Instagram-heart-icon-liked" aria-hidden="true" onClick={this.handleUpvote} />;
    const regularIcon = <i className="fa fa-heart-o Instagram-heart-icon" aria-hidden="true" onClick={this.handleUpvote} />;
    const icon = this.state.liked ? likedIcon : regularIcon;
    
    return (
      <div className="Instagram-card">
        <div className="Instagram-card-image">
          <img
            src={post.image}
          />
        </div>

        <div className="Instagram-card-content">
          <p className="Likes">
            {icon} {post.upvote} likes
          </p>
          <div>
            <p className="Instagram-card-content-user">{post.author}</p>
            <p className="Instagram-card-content-message">{post.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeReviewCard;