import React from 'react';
import ProfileNavBar from '../components/ProfileNavbar/ProfileNavBar'
import ProfileHistoryButton from '../components/ProfileHistoryButton/ProfileHistoryButton';
import "./ProfilePage.css";

function ProfilePage() {
    return (
        <>
            <div class="h-screen">
                <div class="ProfNavBar">
                    <ProfileNavBar />
                </div>
                <div class="Content h-full">
                    <ProfileHistoryButton />
                </div>
            </div>
        </>
    )
}

export default ProfilePage