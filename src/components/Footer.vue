<template>
  <div class="footer-box row">
      <div class="footer-info col-8">
          <h1>About Us</h1>
          <p>This is a project by Paul Burgess. You can uses this in anyway you wish as long as it is <b>NON-COMMERCIAL</b>.
            This project uses Bootstrap and FontAwesome for stylization. If you would like to get in contact with me please use one of the links to the right.</p>
      </div>
      

      <div class="footer-links col-4">
          
          <ul  class="list-unstyled">
              <li>
                  <h5>Follow Me</h5>
                </li>
              <li>
                <a
                    class="btn btn-primary btn-floating m-1"
                    style="background-color: #0077b5;"
                    href="https://www.linkedin.com/in/paul-m-burgess/"
                    role="button">
                    <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a
                    class="btn btn-primary btn-floating m-1"
                    style="background-color: #333333;"
                    href="https://github.com/PaulBurgess1/"
                    role="button">
                    <i class="fab fa-github"></i>
                </a>
              </li>
          </ul>
      </div>
  <div class="footer-copyright row">
    
    <p>© 2021 Copyright: <a href="#">Paul Burgess</a></p>
    <p>All rights reserved.</p>
    
  </div>
  </div>
   
</template>


<!--Script-->
<script>

export default {
  name: 'Footer',
}
</script>

<style>
    .footer-box{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align:center;
        background-color: var(--clr-bg-hf);
        color: var(--clr-text);
        padding-top:1rem;
    }
    .footer-copyright{
      width:100%;
      padding-top: 0.5rem;
      background-color: rgba(0, 0, 0, 0.2);
    }
</style>