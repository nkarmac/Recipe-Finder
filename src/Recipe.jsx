import PropTypes from "prop-types";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

function Recipe(props) {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "90%",
        border: "2px solid rgba(0, 0, 0, 0.75)",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.60)",
        backgroundColor: "#ffffd9",
        overflow: "hidden",
      }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img src={props.image} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography
          level="h3"
          sx={{
            textDecoration: "underline",
            fontFamily: "cursive",
            textAlign: "center",
          }}
        >
          {props.title}
        </Typography>
        <ul style={{ padding: "1rem" }}>
          {props.ingredients.map((ingredient, index) => {
            return (
              <li key={index}>
                <Typography
                  level="title-lg"
                  sx={{
                    mt: 1,
                    fontWeight: "md",
                    textAlign: "left",
                    fontFamily: "Lucida Console, Monospace",
                  }}
                >
                  {ingredient.text}
                </Typography>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardOverflow>
        <Button
          variant="solid"
          color="danger"
          size="lg"
          onClick={() => window.open(`${props.url}`, "_blank").focus()}
        >
          See Recipe
        </Button>
      </CardOverflow>
    </Card>
  );
}

export default Recipe;

Recipe.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  ingredients: PropTypes.array,
};

Recipe.defaultProps = {
  title: "",
  image: "",
  ingredient: [],
  url: "",
};
