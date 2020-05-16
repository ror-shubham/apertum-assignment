import React from "react";
import './Card.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const UserCard = ({user}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {user.age}
        </Typography>
        <Typography variant="h5" component="h2">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {user.accountId}
        </Typography>
      </CardContent>
    </Card>
  )
};
