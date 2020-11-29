# Simple file uploader

Dead simple NodeJS file upload server.

## Usage

### Uploading a file

- Request type: ```POST```
- Endpoint: ```/```
- Content-Type: ```multipart/form-data```
- Body: ```{ file: binary }```

Example:

```javascript
var data = new FormData();
data.append('file', imageFile);

axios({
  method: 'post',
  url: 'http://example.com/',
  data: data,
  headers: {'Content-Type': 'multipart/form-data' }
  })
  .then((response) => {
    // success
    console.log(response);
  })
  .catch(function (response) {
    // error
    console.log(response);
});
```

Success Response:

- Status: ```200```
- Body: ```{ success: 1, downloadUrl: req.headers.host + '/download/' + req.file.filename }```

### Downloading a file

- Request type: ```GET```
- Endpoint: ```/download/{{generatedfilename}}.{{extension}}```

Example:

```bash
curl http://example.com/378877687598.jpg -o myImage.jpg
```

## Todo

- Use secret token for simple authentication

## Contribution

- Fork and make a PR
- Create an Issue
