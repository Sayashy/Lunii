import axios from 'axios';
import styled from '@emotion/styled';
import { Fragment, useState } from 'react';
import { Add, Visibility } from '@mui/icons-material';
import { copyToClipboard, isURL } from '../utils/helpers';
import { Typography, Grid, Paper, ButtonBase, Chip, IconButton, InputBase, Snackbar, Alert, Fade } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [url, setUrl] = useState({ full: '', short: '' });
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false);

  const postUrl = async () => {
    if (!isURL(url.full)) return setOpen(true);

    const resp = await axios.post('http://localhost:20000', { full: url.full });

    if (!resp.data.success) return setOpen(true);

    setUrl({ ...url, short: resp.data.item.short });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.key === 'Enter' && postUrl();
  };

  const copyWithFade = () => {
    setFade(true);
    copyToClipboard('http://localhost:20000/' + url.short);
    setTimeout(() => setFade(false), 600);
  };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  });

  return (
    <Fragment>
      <Paper elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 600, minWidth: 300 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container sx={{ width: 500 }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  Lunii's Url Shortener
                </Typography>
              </Grid>
              <Grid item xs>
                <Paper elevation={1} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                  <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setUrl({ ...url, full: e.target.value })}
                    placeholder="http://lunii.com"
                  />
                  <IconButton onClick={postUrl} aria-label="add">
                    <Add />
                  </IconButton>
                </Paper>
              </Grid>
              {url.short ? (
                <Grid item xs>
                  <Paper
                    elevation={0}
                    onClick={copyWithFade}
                    sx={{ p: 2, margin: 'auto', backgroundColor: 'greenyellow', cursor: 'pointer' }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography color="grey">{url.short}</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Fade in={fade}>
                          <Typography color="blue">copied!</Typography>
                        </Fade>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ) : null}
              <Grid item sx={{ textAlign: 'right' }}>
                <Link to={'/urls'} style={{ textDecoration: 'none' }}>
                  <Chip clickable label="Can i see all of them ?" color="info" icon={<Visibility />} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} sx={{ alignSelf: 'center', width: '100%', textAlign: 'center' }}>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src="/lunii.jpg" />
            </ButtonBase>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Oh! It seems like the URL provided isn't valid :(</Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Home;
