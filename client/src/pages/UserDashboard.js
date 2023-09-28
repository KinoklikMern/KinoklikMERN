import React from "react";
import "./UserDashboard.scss";

function Dashboard() {
  return (
    <>
      <div>
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <div class="left-panel">
                <div class="text-center acc-name"></div>
                <ul class="nav nav-tabs left-tabs" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link tab-clickable left-heading"
                      data-bs-toggle="tab"
                      data-bs-target="#account"
                      role="tab"
                      aria-controls="account-left"
                      aria-selected="true"
                    >
                      <i class="fas fa-user-circle"></i> My Account
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link tab-clickable left-heading"
                      data-bs-toggle="tab"
                      data-bs-target="#payment"
                      role="tab"
                      aria-controls="payment-left"
                      aria-selected="false"
                    >
                      <i class="fas fa-credit-card"></i> Payment
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link tab-clickable left-heading"
                      data-bs-toggle="tab"
                      data-bs-target="#billing"
                      role="tab"
                      aria-controls="billing-left"
                      aria-selected="false"
                    >
                      <i class="fas fa-receipt"></i> Billing History
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link tab-clickable left-heading"
                      data-bs-toggle="tab"
                      data-bs-target="#setting"
                      role="tab"
                      aria-controls="setting-left"
                      aria-selected="false"
                    >
                      <i class="fas fa-cog"></i> Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-9 right-panel">
              <div class="container">
                <div class="tab-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
