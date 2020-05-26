import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
    },
});

const ProjectCard = ({projectData, onClick}) => {
    const classes = useStyles();
    return (
            <Card className={"col-md-4" + classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={projectData.title}
                        height="140"
                        image={projectData.image}
                        title={projectData.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {projectData.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {projectData.long_description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => onClick(projectData._id)} >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
    
    )
}

export default ProjectCard;