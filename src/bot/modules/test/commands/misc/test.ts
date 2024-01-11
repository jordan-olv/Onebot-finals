module.exports = {
  name: 'test',

  execute(client: any, message: any) {
    console.log('test');
    message.channel.send('test');
  }
};