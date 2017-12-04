import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import FloatingButton from './FloatingButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class FormDialog extends React.Component {
  state = {
    open: false,
    author: '',
    message: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.firebase.ref('posts').push({
      author: this.state.author,
      message: this.state.message,
      upvote: 0
    });

    this.setState({
      author: '',
      message: ''
    });

    this.handleRequestClose();
  };

  updateMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  updateAuthor = (e) => {
    this.setState({ author: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <FloatingButton click={this.handleClickOpen} />
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Wedding Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Send your warmest love to the newly weds! Your wedding messages will be shown shortly.
            </DialogContentText>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                onChange={this.updateAuthor}
              />
              <TextField
                margin="dense"
                id="message"
                label="Message"
                type="text"
                rows="4"
                fullWidth
                multiline
                onChange={this.updateMessage}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="accent">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormDialog);