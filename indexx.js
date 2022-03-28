const mailchimp = require('@mailchimp/mailchimp_marketing')


mailchimp.setConfig({
  apiKey: '9ba435e9ff08cdabb138efc229f00528-us14',
  server: 'us14',
  
})
;(async () => {
  const allList = await mailchimp.lists.getAllLists()
  const firstList = allList.lists[0]

  if (firstList) {
    await mailchimp.lists.deleteList(firstList.id)
  }

  // Create list
  const newList = {
    name: 'Testing from api',
    permission_reminder: 'permission_reminder',
    email_type_option: true,
    contact: {
      company: 'Test Sdn Bhd',
      address1: 'No 123, Jalan Developer',
      city: 'Ampang',
      country: 'MY',
      state: 'Selangor',
      zip: '68000',
    },
    campaign_defaults: {
      from_name: 'Fita',
      from_email: 'ashrafiphone94@gmail.com',
      subject: 'Enjoying fita news',
      language: 'english',
    },
  }

  const createdList = await mailchimp.lists.createList(newList)

  const newMember = {
    email_address: 'ashraf29194@gmail.com',
    status: 'subscribed',
  }
  const addMemberToList = await mailchimp.lists.addListMember(
    createdList.id,
    newMember
  )

  const newBatchMembers = [
     {
       email_address: 'ryan.ramadhan@ematicsolutions.com',
       status: 'subscribed',
    },
    {
      email_address: 'edwin.melendez@ematicsolutions.com',
      status: 'subscribed',
    },
     {
       email_address: 'christianto@ematicsolutions.com',
       status: 'subscribed',
     },
  ]

  const addedBatchMember = await mailchimp.lists.batchListMembers(
    createdList.id,{
	members:newBatchMembers}
  )

  const newCampaign = {
    type: 'plaintext',
    recipients: {
      list_id: createdList.id,
	  
    },
	settings :{
		subject_line:'campaign',
		from_name:'ashraf29194',
		reply_to:'ashraf29194@gmail.com',
		
	}
	
		
  }

  const createdCampaign = await mailchimp.campaigns.create(newCampaign)

  await mailchimp.campaigns.setContent(createdCampaign.id,{plain_text:'htmlcontent'})
  await mailchimp.campaigns.send(createdCampaign.id)

  const info = await mailchimp.campaigns.get(createdCampaign.id)

  console.log(info)
})()



