
import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    font: "Muli"
};
const themeName = 'San Marino Razzmatazz Llama';

export const aboutUs = "Today we are launching Build/Connect, a portal that allows university students who don’t have summer plans to explore new, cool projects and build connections. Students can join existing projects or create their own postings and form teams on Build/Connect. Even better, students have the opportunity to be connected with an industry professional mentor to advise them throughout the project. ";

export default createMuiTheme({ palette, themeName});