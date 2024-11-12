<script setup>
import { RouterLink, RouterView } from "vue-router"


import { ref } from "vue"

const sidebar_class = ref("collapsed")
const collapse_icon = ref(true)


function toggleSidebar() {
    console.log('toggleSidebar called')
    sidebar.classList.toggle('collapsed');
    collapse_icon.value = !collapse_icon.value;
    window.dispatchEvent(new Event('resize'));
}


</script>
<template>

    <div class="d-flex">
        <!-- Sidebar -->

        <div id="sidebar" v-bind:class="sidebar_class">


            <a href="#" class="sidebar-item" style="padding: 7px;">
                <i>
                    <svg height="40" width="40" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                        <path style="fill:#D6E5F6;" d="M253.659,0H86.661C73.809,0,63.389,10.422,63.389,23.273c0,12.853,10.42,23.273,23.273,23.273h13.521
	v187.988c0,12.854,10.42,23.273,23.273,23.273h39.201c6.173,0,12.092-2.451,16.455-6.816l32.084-32.084v56.076L107,379.181
	c-6.656,6.654-8.647,16.665-5.046,25.363c3.603,8.695,12.089,14.365,21.501,14.365H388.54c12.853,0,23.273-10.418,23.273-23.273
	V158.161C411.814,70.951,340.865,0,253.659,0z" />
                        <path style="fill:#A4C6EC;" d="M295.989,5.762v413.147h92.551c12.853,0,23.273-10.418,23.273-23.273V158.161
	C411.814,85.61,362.705,24.318,295.989,5.762z" />
                        <path style="fill:#385C8E;" d="M438.483,372.364H73.517c-12.853,0-23.273,10.422-23.273,23.273v93.091
	c0,12.854,10.42,23.273,23.273,23.273h364.966c12.853,0,23.273-10.418,23.273-23.273v-93.091
	C461.756,382.785,451.336,372.364,438.483,372.364z" />
                        <path style="fill:#1D3366;" d="M438.483,372.364H256V512h182.483c12.853,0,23.273-10.418,23.273-23.273v-93.091
	C461.756,382.785,451.336,372.364,438.483,372.364z" />
                    </svg>
                </i>
                <span class="dancing-script-brand" style="font-weight: 600; font-size: x-large;">Chess</span>
            </a>

            <br>






            <RouterLink to="/" active-class="active" class="sidebar-item">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                        class="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path
                            d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>
                </i>
                <span>Home</span>
            </RouterLink>


            <RouterLink to="/play" active-class="active" class="sidebar-item">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                        class="bi bi-joystick" viewBox="0 0 16 16">
                        <path
                            d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2" />
                        <path
                            d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23" />
                    </svg>
                </i><span>Play</span>
            </RouterLink>






            <a class="sidebar-item" v-on:click="toggleSidebar">
                <i v-if="!collapse_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                        class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                    </svg>
                </i>
                <i v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5" />
                    </svg>
                </i>
                <span>Collapse</span>
            </a>

            <a class="sidebar-item">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path
                            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                </i>

                <span>Settings</span>
            </a>

        </div>

        <!-- Content -->
        <div id="content" class="flex-grow-1">



            <RouterView></RouterView>



        </div>
    </div>



</template>

<style scoped>
/* Styling for sidebar and content */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');

.dancing-script-brand {
    font-family: "Tiny5", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

#sidebar {
    width: 130px;
    height: 100vh;
    background-color: #343a40;
    color: white;
    transition: width 0.3s;
}

#sidebar.collapsed {
    width: 50px;
}

.sidebar-item {
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-top: 4px;
    padding-bottom: 4px;
    color: white;
    text-decoration: none;
    transition: all 0.3s;
}

.sidebar-item:hover {
    background-color: #495057;
}

.sidebar-item i {
    font-size: 1.2rem;
}

.sidebar-item span {
    margin-left: 10px;
    transition: opacity 0.3s;
}

#sidebar.collapsed .sidebar-item span {
    opacity: 0;
}

#content {
    margin-left: 10px;
    /* Set initial margin based on expanded sidebar */
    transition: margin-left 0.3s;
}

.active {
    color: green;
    font-size: large;
    font-weight: 800;
    background-color: #495057;
}
</style>