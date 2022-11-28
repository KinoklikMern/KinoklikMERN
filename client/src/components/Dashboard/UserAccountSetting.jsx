import React from 'react'
import './userAccountSetting.css';


const UserAccountSetting= ({ handleClose, show, children }) => {
    

   
      const showHideClassName = show ? "modal display-block" : "modal display-none";
    
      return (
        <div className={showHideClassName}>
          <section className="modal-main">
            {children}
            <div class="container">

  <div class="row">
    <div class="col-md-3">
      <div class="left-panel">
        <div class="text-center acc-name">
      
        <p><img width="30%"  class = "rounded-circle" src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"></img>username</p> 
         
    
        </div>
        <ul class="nav nav-tabs left-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <div 
                class="nav-link tab-clickable left-heading"
                data-bs-toggle="tab" data-bs-target="#account" 
                role="tab" 
                aria-controls="account-left" 
                aria-selected="true"
                ><i class="fas fa-user-circle"></i> My Account</div>
          </li>
          <li class="nav-item" role="presentation">
            <div 
                class="nav-link tab-clickable left-heading" 
                data-bs-toggle="tab"
                data-bs-target="#payment"
                role="tab"
                aria-controls="payment-left"
                aria-selected="false"
                ><i class="fas fa-credit-card"></i> Payment</div>
          </li>
          <li class="nav-item" role="presentation">
            <div
                class="nav-link tab-clickable left-heading"
                data-bs-toggle="tab"
                data-bs-target="#billing"
                role="tab"
                aria-controls="billing-left"
                aria-selected="false"
                ><i class="fas fa-receipt"></i> Billing History</div>
          </li>
          <li class="nav-item" role="presentation">
            <div class="nav-link tab-clickable left-heading" 
                    data-bs-toggle="tab" 
                    data-bs-target="#setting" 
                    role="tab" 
                    aria-controls="setting-left" 
                    aria-selected="false"
                    ><i class="fas fa-cog"></i> Settings</div>
          </li>
        </ul>
        <button type="button" onClick={handleClose}>
              Close
            </button>
      </div>
    </div>
    <div class="col-md-9 right-panel">
      <div class="container">
        <div class="tab-content">
          <p>myAccount</p>
          <p>paymentMethod</p>
          <p>billingHistory</p>
          <p>Setting</p>
        </div>
      </div>
    </div>
  </div>
           
</div>

           
          </section>
        </div>
      );
    };
    
    
    export default UserAccountSetting
    


