import React from 'react'
import NpcList from '../../components/npc/NpcList'
import AddNpc from '../../components/npc/AddNpc'


const NpcPage = () => {

  function npcAction(data){
      try {
          fetch('${process.env.NEXT_PUBLIC_API_URL}/adminPanel/addData', {
          method:'POST',
          headers:{
          'Accept': 'application/json',
          'content-Type':'application/json'
          },
          body:JSON.stringify(data)
        
      }).then((res)=>{
          console.log("result", res);
        
      });
      console.warn("index", data);
      }
      catch (err) {
          console.log(err);
      }
  }


  return (
    <div>
       <div className='main-content'>
           <NpcList/>
           <AddNpc npcAction={npcAction} />
        </div>
    </div>
  )
}

export default NpcPage