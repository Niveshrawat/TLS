import React from 'react';
import { Grid,TextField, Card, CardHeader, CardContent } from '@mui/material';
import Chart from './Graph';
import PieChart from './PieChart';


const Graph = () => {
  return (
    <Grid container spacing={3} >
     
      <Grid item xs={12} sm={8}>
        <Card>
          <CardHeader
            title="Site Statistics"
            action={<TextField variant="outlined" defaultValue="04/24/2024 - 05/08/2024" />}
          />
          <CardContent>
            <Chart width="958" height="479"/>
          </CardContent>
        </Card>
      </Grid>

  
      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Scheme Statistics" />
          <CardContent>
            < PieChart id="schemeChart" width="447" height="447" style={{display: "block", boxSizing: "border-box", height: "447px", width: "447px"}}/>
          </CardContent>
        </Card>
      </Grid>

      {/* <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Top Country Statistics" />
          <CardContent>
          < PieChart id="schemeChart" width="447" height="447" style={{display: "block", boxSizing: "border-box", height: "447px", width: "447px"}}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Best Browser Statistics" />
          <CardContent>
            <PieChart id="browserChart" width="447" height="447"/>
          </CardContent>
        </Card>
      </Grid> */}
     
    </Grid>
  );
};

export default Graph;
