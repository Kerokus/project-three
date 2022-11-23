import React from 'react';
import Card from 'react-bootstrap/Card';

const SingleTeam = () => {
  var htmlRender = '';

  // Gen test data 'til the API is setup.
  const objOneTeam = {
    team_lead: 'SFC BeardOf Zeus',
    name: 'JTF Kuwait',
    current_size: '4',
    location: 'Camp Arifjan',
    description: 'MIB HUMINT/SIGINT Support to JTF Kuwait',
    start_date: '2022-11-01',
    end_date: '2023-04-30',
    names: [
      { id: 1,
        first_name: 'Snuffa',
        last_name: 'Lupagus',
        rank: 'PFC',
        mos: '35M',
        dep_start: '2023-02-01',
        dep_end: '2023-04-30',
        contact: 'WHATISTHIS???'
      },
      { id: 2,
        first_name: 'Oscar',
        last_name: 'DaGrouch',
        rank: 'SFC',
        mos: '35M',
        dep_start: '2022-11-01',
        dep_end: '2023-01-31',
        contact: 'WHATISTHIS???'
      },
      { id: 3,
        first_name: 'BeardOf',
        last_name: 'Zeus',
        rank: 'SFC',
        mos: '35M',
        dep_start: '2022-11-01',
        dep_end: '2023-04-30',
        contact: 'WHATISTHIS???'
      },
      { id: 4,
        first_name: 'Mister',
        last_name: 'Hooper',
        rank: 'SGT',
        mos: '35M',
        dep_start: '2023-02-01',
        dep_end: '2023-04-30',
        contact: 'WHATISTHIS???'
      },
      { id: 5,
        first_name: 'Burt',
        last_name: 'JustBurt',
        rank: 'SSG',
        mos: '35M',
        dep_start: '2023-02-01',
        dep_end: '2023-04-30',
        contact: 'WHATISTHIS???'
      }
    ]
  }

  //TOMORROW MOVE THE HTML TO OUR NEW VAR.
  return (
//  htmlRender = 
    <><br />
    <div className="row row-cols-2 justify-content-center">
    <Card className="text-white bg-dark">
      <Card.Body>
        <Card.Title>{objOneTeam.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{objOneTeam.location}</Card.Subtitle>
        <Card.Text>
          Deployment Dates: {objOneTeam.start_date} - {objOneTeam.end_date}<br />
          Team Size: {objOneTeam.current_size}<br />
        </Card.Text>

        {/* {objOneTeam.names.map(row => {
     "<Card.Text>" + {row.rank} + "</Card.Text><br>";
  })}

         */}

        <Card.Footer>
          Mission Desc: {objOneTeam.description}<br />
        </Card.Footer>
        <Card.Link href="#">View Details</Card.Link>
        <Card.Link href="#">Delete Mission</Card.Link>
      </Card.Body>
    </Card>
    </div>
    <br />
    </>

//return (htmlRender);
  )
}

const BuildPersonnelJSX = (team) => {
  return team.names.map(row => {
    return "<br>";
  })
}

export default SingleTeam

// {objOneTeam.names.map((row) => {
//   return (
//     <Card.Text>{row.rank} {row.first_name} {row.last_name}</Card.Text><br>
//   )
//   })}



/*
teams:
-----
team_lead
name
current_size

mission/acty:
------------
location
description
start_date
end_date

personnel:
---------
first_name
last_name
rank
mos
dep_start
dep_end
contact
team_id
*/