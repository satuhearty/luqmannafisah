import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  container: {
    position: 'fixed',
    bottom: 15,
    right: 15
  },
  button: {
    margin: theme.spacing.unit,
  }
});

function FloatingActionButtons(props) {
  const { classes, click } = props;
  return (
    <div className={classes.container}>
      <Button fab color="primary" aria-label="add" className={classes.button} onClick={click}>
        <AddIcon />
      </Button>
    </div>
  );
}

export default withStyles(styles)(FloatingActionButtons);
