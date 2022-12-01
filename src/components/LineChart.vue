<template>
    <div>
        <canvas :id="'myChart'+key"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default({
    props:['key'],
    components:{
        Chart
    },
    setup() {
        
    },
    data(){
        return {
        }
    },
    mounted() {
        setTimeout(()=>{
            this.creategraph();
        },1000)
    },
    methods: {
        creategraph(){
            const ctx = document.getElementById('myChart'+this.key);
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [1,2,3,4,5,6,7],
                    datasets: [{
                        label: 'time',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: '#a75534',
                        tension: 0.5
                    },{
                        label: 'space',
                        data: [105, 549, 850, 861, 576, 575, 470],
                        fill: false,
                        borderColor: '#335E6F',
                        tension: 0.5
                    }]
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: false
                    }
                    }
                }
            });
        }
    },
})
</script>