import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";

export default function EventDetails() {
  return (
    <>
      <Box>
        <Typography variant="h2">
          Matt & Erin's Silver Anniversary Party
        </Typography>
        <Typography variant="subtitle1">Dress your best from 1998</Typography>
        <Card sx={{maxWidth: 345}}>
          <CardMedia
            sx={{height: 140}}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="food card image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{textTransform: "uppercase"}}
            >
              Food
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Share</Button> */}
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <List>
          <ListItem>Party at 3pm - 10pm</ListItem>
          <ListItem>
            Apps Mingle nonalcoholic refreshers corn hole badminton games
          </ListItem>
          <ListItem>Alcohol serving from 4pm-10pm</ListItem>
          <ListItem>food (main) 6pm</ListItem>
          <ListItem>karaoke, dancing, late night snacks</ListItem>
          <ListItem>
            After party: Sunday june 25th at 12:30pm (7mi canoe trip) canoe
            country{" "}
          </ListItem>
        </List>
      </Box>
    </>
  );
}
