// Interactive Quote Calculator Logic
function calculateEstimate() {
    const baseSelect = document.getElementById('basePlan');
    if (!baseSelect) return;

    let total = parseInt(baseSelect.value) || 0;

    const checkboxes = document.querySelectorAll('.addon-check');
    checkboxes.forEach(chk => {
        if (chk.checked) {
            total += parseInt(chk.value) || 0;
        }
    });

    const estimateEl = document.getElementById('finalEstimate');
    if (estimateEl) {
        estimateEl.innerText = '₹' + total.toLocaleString('en-IN');
    }
}

// Build and open WhatsApp chat with pre-filled campaign summary message
function sendToWhatsApp() {
    // ✅ REPLACE THIS with your actual WhatsApp Business number (country code + number, no + or spaces)
    const WHATSAPP_NUMBER = '919404775940';

    // --- Read selected base plan ---
    const baseSelect = document.getElementById('basePlan');
    const basePlanName = baseSelect ? baseSelect.options[baseSelect.selectedIndex].text : 'Not selected';
    const basePlanValue = baseSelect ? (parseInt(baseSelect.value) || 0) : 0;

    // --- Read selected add-ons ---
    const selectedAddons = [];
    let addonsTotal = 0;
    const checkboxes = document.querySelectorAll('.addon-check');
    checkboxes.forEach(chk => {
        if (chk.checked) {
            // Get the sibling <span> label text
            const labelSpan = chk.parentElement.querySelector('span');
            const labelText = labelSpan ? labelSpan.textContent.trim() : `Add-on (₹${chk.value})`;
            selectedAddons.push(`  • ${labelText}`);
            addonsTotal += parseInt(chk.value) || 0;
        }
    });

    const grandTotal = (basePlanValue + addonsTotal).toLocaleString('en-IN');

    // --- Build the message ---
    let message = `🏡 *ShubhSthaan Realty – Custom Campaign Enquiry*\n\n`;
    message += `Hello! I'd like to lock in the following custom marketing campaign for my property:\n\n`;
    message += `📋 *Base Plan:*\n  ${basePlanName}\n\n`;

    if (selectedAddons.length > 0) {
        message += `➕ *Add-on Upgrades Selected:*\n${selectedAddons.join('\n')}\n\n`;
    } else {
        message += `➕ *Add-on Upgrades:* None selected\n\n`;
    }

    message += `💰 *Total Estimated Investment: ₹${grandTotal}*\n`;
    message += `_(Excluding custom Google & Meta advertising spends)_\n\n`;
    message += `Please get in touch to finalise my campaign. Thank you!`;

    // --- Open WhatsApp ---
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Bind event listeners when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Run initial calculation
    calculateEstimate();

    // Bind change event to base plan selector
    const baseSelect = document.getElementById('basePlan');
    if (baseSelect) {
        baseSelect.addEventListener('change', calculateEstimate);
    }

    // Bind change event to all add-on checkboxes
    const checkboxes = document.querySelectorAll('.addon-check');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', calculateEstimate);
    });

    // Bind click event to Print Brochure / Save PDF buttons
    const printButtons = document.querySelectorAll('.print-btn-trigger');
    printButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    });

    // Bind click event to "Lock in Custom Campaign" → WhatsApp redirect
    const lockCampaignBtn = document.getElementById('lockCampaignBtn');
    if (lockCampaignBtn) {
        lockCampaignBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sendToWhatsApp();
        });
    }

    // Bind click event to mobile sticky CTA button → same WhatsApp redirect
    const mobileLockBtn = document.getElementById('mobileLockBtn');
    if (mobileLockBtn) {
        mobileLockBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sendToWhatsApp();
        });
    }
});
