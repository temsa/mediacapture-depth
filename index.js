function failure (err) {
  console.error('failure!', err)
}

function success (s) {
  console.log('success !', s)
  // wire the stream into a <video> element for playback
  // ISSUE: should the implementations allow the user to
  // switch between the RGB video and depth stream playback
  // if the stream contains both video and stream tracks?
  var video = document.querySelector('#video')
  video.src = URL.createObjectURL(s)
  video.play()

  // construct a new MediaStream out of the existing depth track(s)
  var depthStream = new MediaStream(s.getDepthTracks()[0])

  // (not supported, for future work)
  // send the newly created depth stream over a RTCPeerConnection
  // var peerConnection = new RTCPeerConnection(config);
  // peerConnection.addStream(depthStream);

  // wire the depth stream into another <video> element for playback
  // NOTE: how the depth information is visualized as a 8-bit grayscale representation
  var depthVideo = document.querySelector('#depthVideo')
  depthVideo.src = URL.createObjectURL(depthStream)
  depthVideo.play()
}

navigator.mediaDevices.getUserMedia({ video: true, depth: true })
  .then(success)
  .catch(failure)
