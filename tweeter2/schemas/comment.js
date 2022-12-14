export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name:'profileImg',
      title:'Profile Image',
      type:'string',
    },{
      name:'tweet',
      title:'Tweet',
      description:'Reference the Tweet the comment in asociated to:',
      type:'reference', 
      to:{
        type:'tweet',
      }
    },
    { 
      name:'like',
      title:'Like',
      type:'number'
    }
    
  ],
 
}
