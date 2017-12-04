import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import Badge from 'material-ui/Badge';
import FavoriteIcon from 'material-ui-icons/Favorite';

const styles = theme => ({
  media: {
    height: 200
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

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
      upvote: post.upvote + 1,
      hasImage: post.hasImage
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
    const { post } = this.props;
    const imagesPath = post.hasImage ? `/images/${post.key}.jpeg` : `/images/wedding.jpeg`;
    const likedIcon = <i className="fa fa-heart Instagram-heart-icon-liked" aria-hidden="true" onClick={this.handleUpvote} />;
    const regularIcon = <i className="fa fa-heart-o Instagram-heart-icon" aria-hidden="true" onClick={this.handleUpvote} />;
    const icon = this.state.liked ? likedIcon : regularIcon;

    return (
      <div className="Instagram-card">
        <div className="Instagram-card-image">
          <img src={imagesPath} />
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

export default withStyles(styles)(RecipeReviewCard);