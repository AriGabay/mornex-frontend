import * as React from 'react';
import { Card as CardMui } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { decodedJwt } from '../../services/user-service';

export default function Card({ data, setModalOpen, setTypeAction }) {
  const userStatus = decodedJwt();
  return (
    data && (
      <CardMui sx={{ maxWidth: 345 }} style={{ margin: '0 auto' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.role}
          </Typography>
        </CardContent>
        {userStatus?.rls === 'Admin' && (
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                setModalOpen(true);
                setTypeAction({ type: 'edit', cardId: data.id });
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              onClick={() => {
                setModalOpen(true);
                setTypeAction({ type: 'delete', cardId: data.id });
              }}
            >
              Delete
            </Button>
          </CardActions>
        )}
      </CardMui>
    )
  );
}
