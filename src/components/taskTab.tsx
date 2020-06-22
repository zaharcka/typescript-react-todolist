import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {TaskList} from "./taskList";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
};

interface SimpleTabsProps {
    tasks: Array<Task>;
    categories: Array<Category>;
    toggleTask: toggleTask;
    selectTask: selectTask;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                   {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const SimpleTabs: React.FC<SimpleTabsProps> = (props: SimpleTabsProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const { tasks, toggleTask, selectTask, categories } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {
                        categories.map((item, index) => (
                            <Tab label={item.name} {...a11yProps(index)} />
                        ))
                    }
                </Tabs>
            </AppBar>

            {
                categories.map((item, index) => (
                    <TabPanel value={value} index={index}>
                        <TaskList tasks={tasks.filter(t => t.category === index)} toggleTask={toggleTask} selectTask={selectTask} />
                    </TabPanel>
                ))
            }
        </div>
    );
}