const allIndustries = [
    { name: "Plumbing", cpc: 15.4, desc: "Urgent plumbing issues raise demand, leading to higher ad costs." },
    { name: "HVAC", cpc: 10.12, desc: "Heating and cooling are essential, maintaining steady demand and moderate ad costs." },
    { name: "Pest Control", cpc: 5.0, desc: "Pest issues prompt immediate action, sustaining a reasonable CPC." },
    { name: "Locksmith Services", cpc: 8.5, desc: "Emergency lockouts are common, increasing the value of each lead and the CPC." },
    { name: "Roofing", cpc: 11.9, desc: "Roof replacements are high-value projects, resulting in more competition and higher CPC." },
    { name: "Electrical", cpc: 8.1, desc: "Professional electrical work is always in demand, keeping CPC stable." },
    { name: "Landscaping", cpc: 3.84, desc: "Seasonal landscaping needs maintain a modest CPC." },
    { name: "Construction", cpc: 6.88, desc: "Long-term, high-value projects result in a moderate CPC range." },
    { name: "Automotive", cpc: 2.46, desc: "Routine automotive services ensure steady but not overly expensive ad costs." },
    { name: "Home Improvement", cpc: 4.25, desc: "DIY interest and professional services keep CPC at a moderate level." },
    { name: "Cleaning Services", cpc: 4.5, desc: "Consistent cleaning needs lead to a balanced CPC." },
    { name: "Moving Services", cpc: 6.0, desc: "Seasonal moves maintain moderate ad costs due to steady demand." },
    { name: "Painting Services", cpc: 5.2, desc: "Regular home painting projects keep CPC in a moderate range." },
    { name: "Septic Services", cpc: 5.0, desc: "Specialized maintenance ensures a stable and moderate CPC." }
];

let monthlyChart, growthChart, savingsChart;
let selectedIndustry = null;
let selectedIndustryCpc = null;

document.addEventListener('DOMContentLoaded', () => {
    const allIndustriesGrid = document.getElementById('allIndustriesGrid');
    allIndustries.forEach(ind => {
        const btn = document.createElement('div');
        btn.classList.add('industry-btn');
        btn.textContent = ind.name;
        btn.onclick = () => {
            selectIndustryFromGrid(ind);
        };
        allIndustriesGrid.appendChild(btn);
    });
});

function selectIndustryFromGrid(selectedInd) {
    document.getElementById('allIndustriesGrid').style.display = 'none';
    document.getElementById('threeColumnLayout').style.display = 'block';
    populateColumnsAndSelectIndustry(selectedInd);
}

function populateColumnsAndSelectIndustry(selectedInd) {
    const left = allIndustries.slice(0,7);
    const right = allIndustries.slice(7,14);

    const leftList = document.getElementById('left-industry-list');
    const rightList = document.getElementById('right-industry-list');
    leftList.innerHTML = '';
    rightList.innerHTML = '';

    left.forEach(ind => {
        const btn = document.createElement('div');
        btn.classList.add('industry-btn');
        btn.textContent = ind.name;
        btn.onclick = () => { selectIndustryFromMenus(ind); };
        leftList.appendChild(btn);
    });

    right.forEach(ind => {
        const btn = document.createElement('div');
        btn.classList.add('industry-btn');
        btn.textContent = ind.name;
        btn.onclick = () => { selectIndustryFromMenus(ind); };
        rightList.appendChild(btn);
    });

    selectIndustryFromMenus(selectedInd);
}

function selectIndustryFromMenus(ind) {
    selectedIndustry = ind.name;
    selectedIndustryCpc = Math.round(ind.cpc);

    document.getElementById('selected-industry-description').style.display = 'block';
    document.getElementById('selected-industry-description').innerHTML = `
        <h2>Selected Industry: ${ind.name}</h2>
        <p>${ind.desc}</p>
    `;
    document.getElementById('cost-per-click').value = selectedIndustryCpc.toString();

    highlightSelectedIndustry(ind.name);
    clearForm(false);
}

function highlightSelectedIndustry(name) {
    const menuButtons = document.querySelectorAll('#left-industry-list .industry-btn, #right-industry-list .industry-btn');
    menuButtons.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === name) {
            btn.classList.add('selected');
        }
    });
}

function updateGraphs() {
    const monthlySpend = Math.round(parseFloat((document.getElementById('monthly-spend').value || '').replace(/,/g, ''))) || 0;
    const costPerClick = Math.round(parseFloat(document.getElementById('cost-per-click').value)) || 0;
    const organicTrafficGrowth = parseFloat(document.getElementById('organic-traffic-growth').value) || 0;
    const startingTraffic = Math.round(parseInt((document.getElementById('starting-organic-traffic').value || '').replace(/,/g, ''))) || 0;

    if (monthlySpend <= 0 || costPerClick <= 0 || organicTrafficGrowth <= 0 || startingTraffic <= 0) {
        document.getElementById('results').innerHTML = '';
        hideChartsAndText();
        document.getElementById('toggle-details-btn').style.display = 'none';
        return;
    }

    const estimatedClicks = Math.round(monthlySpend / costPerClick);
    const organicTrafficValueMonthly = Math.round(startingTraffic * costPerClick);
    const annualSpend = Math.round(monthlySpend * 12);

    let organicTraffic = startingTraffic;
    let totalOrganicTraffic = 0;
    const growthRate = 1 + organicTrafficGrowth / 100;
    const monthlyTraffic = [];

    for (let i = 0; i < 12; i++) {
        organicTraffic *= growthRate;
        totalOrganicTraffic += organicTraffic;
        monthlyTraffic.push(Math.round(organicTraffic));
    }

    const organicTrafficValueAnnual = Math.round(totalOrganicTraffic * costPerClick);
    const savings = Math.round(organicTrafficValueAnnual - annualSpend);
    const potentialVisitsLost = estimatedClicks;

    const fmt = (val) => Math.round(val).toLocaleString();

    document.getElementById('results').innerHTML = `
    
    <details class="result-item good">
        <summary>
            Estimated Clicks Per Month from Ads
            <span class="value">${fmt(estimatedClicks)}</span>
        </summary>
        <p>Each month, you pay for approximately ${fmt(estimatedClicks)} visitors. These paid visitors only come in as long as you continue to spend money on ads.</p>
    </details>
    <details class="result-item bad">
        <summary>
            Potential Visits Lost if Ads Stop
            <span class="value">${fmt(potentialVisitsLost)}</span>
        </summary>
        <p>Should you stop running ads, you immediately lose these ${fmt(potentialVisitsLost)} monthly visitors. Without paying for ads, this traffic disappears.</p>
    </details>
    <details class="result-item good">
        <summary>
            Estimated Organic Traffic Growth (1 Month)
            <span class="value">${fmt(Math.round(startingTraffic * (1 + organicTrafficGrowth / 100)))} visits</span>
        </summary>
        <p>After one month at your specified growth rate, your organic visitors may increase to about ${fmt(Math.round(startingTraffic * (1 + organicTrafficGrowth / 100)))}. This growth does not require ongoing ad spend, offering sustainable improvement.</p>
    </details>
    <details class="result-item good">
        <summary>
            Estimated Organic Traffic Growth Over 12 Months
            <span class="value">${fmt(Math.round(totalOrganicTraffic))} visits</span>
        </summary>
        <p>Over a full year, these monthly improvements add up to roughly ${fmt(Math.round(totalOrganicTraffic))} total organic visitors. This audience is gained without continuous ad payments.</p>
    </details>
    <details class="result-item bad">
        <summary>
            Monthly Ad Spend
            <span class="value">$${fmt(monthlySpend)}</span>
        </summary>
        <p>You currently invest $${fmt(monthlySpend)} each month on ads. This expense must be paid repeatedly to maintain the same level of paid traffic.</p>
    </details>
    <details class="result-item good">
        <summary>
            Organic Traffic Value (1 Month)
            <span class="value">$${fmt(organicTrafficValueMonthly)}</span>
        </summary>
        <p>Your existing organic visitors would be worth about $${fmt(organicTrafficValueMonthly)} if acquired through ads. By earning these visitors organically, you save that cost every month.</p>
    </details>
    <details class="result-item bad">
        <summary>
            Annual Ad Spend
            <span class="value">$${fmt(annualSpend)}</span>
        </summary>
        <p>Over a year, your ad expenses total approximately $${fmt(annualSpend)}. At the end of each year, you must pay again to produce similar results through ads.</p>
    </details>
    <details class="result-item good">
        <summary>
            Organic Traffic Value (12 Months)
            <span class="value">$${fmt(organicTrafficValueAnnual)}</span>
        </summary>
        <p>Looking at a full year, your growing organic traffic would be equivalent to around $${fmt(organicTrafficValueAnnual)} worth of paid clicks, obtained without continuous ad spend.</p>
    </details>
    <details class="result-item good">
        <summary>
            Savings by Switching to Organic Traffic
            <span class="value">$${fmt(savings)}</span>
        </summary>
        <p>By focusing on organic growth, you could retain roughly $${fmt(savings)} each year, money that would otherwise be spent on ads. This represents long-term savings and sustainable traffic.</p>
    </details>
    <p class="highlight success">Your organic traffic continues to grow naturally over time, reducing the need for constant advertising costs.</p>
`;

    document.getElementById('toggle-details-btn').style.display = 'inline-block';
    document.getElementById('toggle-details-btn').textContent = 'Click Here to Open All Results';
    closeAllDetails();

    // Update chart explanations
    document.getElementById('comparison-text').textContent = "This bar chart compares your monthly ad spend with the monthly value of your organic traffic. The closer your organic value is to or beyond your ad spend, the more you benefit from not having to pay for each visitor.";
    document.getElementById('growth-text').textContent = "This line chart illustrates your potential monthly organic traffic growth. Over time, as organic traffic steadily increases, you gain more visitors without escalating advertising costs.";
    document.getElementById('savings-text').textContent = "This pie chart contrasts your annual ad spend with the potential savings from focusing on organic growth. Shifting some resources toward long-term improvements can yield greater financial efficiency.";

    document.getElementById('charts-container').style.display = 'block';
    createOrUpdateCharts(
        monthlySpend,
        organicTrafficValueMonthly,
        monthlyTraffic,
        annualSpend,
        organicTrafficValueAnnual,
        savings
    );
}

function createOrUpdateCharts(
    monthlySpend,
    organicTrafficValueMonthly,
    monthlyTraffic,
    annualSpend,
    organicTrafficValueAnnual,
    savings
) {
    if (monthlyChart) monthlyChart.destroy();
    monthlyChart = new Chart(document.getElementById('comparison-chart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Monthly Ad Spend', 'Monthly Organic Traffic Value'],
            datasets: [{
                label: 'Monthly Values ($)',
                data: [monthlySpend, organicTrafficValueMonthly],
                backgroundColor: ['#2979ff', '#28A745'],
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: Math.max(monthlySpend, organicTrafficValueMonthly) * 1.2 }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `$${Math.round(tooltipItem.raw).toLocaleString()}`
                    }
                }
            }
        },
    });

    if (growthChart) growthChart.destroy();
    growthChart = new Chart(document.getElementById('growth-chart').getContext('2d'), {
        type: 'line',
        data: {
            labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
            datasets: [{
                label: 'Organic Traffic Growth',
                data: monthlyTraffic,
                borderColor: '#28A745',
                backgroundColor: 'rgba(40,167,69,0.2)',
                fill: true,
            }],
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `${Math.round(tooltipItem.raw).toLocaleString()} visits`
                    }
                }
            }
        },
    });

    if (savingsChart) savingsChart.destroy();
    savingsChart = new Chart(document.getElementById('savings-chart').getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Ad Spend (12 Months)', 'Savings by Organic Traffic'],
            datasets: [{
                data: [annualSpend, savings],
                backgroundColor: ['#2979ff', '#28A745'],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `$${Math.round(tooltipItem.raw).toLocaleString()}`
                    }
                }
            }
        },
    });
}

function clearForm(resetCPC = true) {
    let cpcBeforeReset = document.getElementById('cost-per-click').value;
    document.getElementById('ad-cost-form').reset();

    if (!resetCPC && selectedIndustryCpc != null) {
        document.getElementById('cost-per-click').value = selectedIndustryCpc;
    } else if (!resetCPC) {
        document.getElementById('cost-per-click').value = Math.round(cpcBeforeReset).toString();
    }

    document.getElementById('results').innerHTML = '';
    document.getElementById('toggle-details-btn').style.display = 'none';
    if (monthlyChart) monthlyChart.destroy();
    if (growthChart) growthChart.destroy();
    if (savingsChart) savingsChart.destroy();
    hideChartsAndText();
    window.scrollTo(0, 0);
}

function resetToInitialState() {
    clearForm(true);
    selectedIndustry = null;
    selectedIndustryCpc = null;
    document.getElementById('threeColumnLayout').style.display = 'none';
    document.getElementById('allIndustriesGrid').style.display = 'grid';
    document.getElementById('selected-industry-description').style.display = 'none';
    window.scrollTo(0,0);
}

function hideChartsAndText() {
    document.getElementById('charts-container').style.display = 'none';
}

function toggleAllDetails() {
    const details = document.querySelectorAll('#results details');
    const btn = document.getElementById('toggle-details-btn');
    const currentlyOpen = btn.textContent.includes('Close');

    details.forEach(d => {
        if (!currentlyOpen) {
            d.setAttribute('open', '');
        } else {
            d.removeAttribute('open');
        }
    });

    btn.textContent = currentlyOpen ? 'Click Here to Open All Results' : 'Click Here to Close All Results';
}

function closeAllDetails() {
    const details = document.querySelectorAll('#results details');
    details.forEach(d => d.removeAttribute('open'));
}
