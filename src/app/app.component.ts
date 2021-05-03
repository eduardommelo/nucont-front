import { Component } from '@angular/core'
import * as Highcharts from 'highcharts'

import Boost from 'highcharts/modules/boost'
import noData from 'highcharts/modules/no-data-to-display'
import More from 'highcharts/highcharts-more'

declare var require: any
const Data = require('../assets/manifest-data.json')

Boost(Highcharts)
noData(Highcharts)
More(Highcharts)
noData(Highcharts)

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['../assets/css/app.component.css']
})
export class AppComponent {
    public listYears: any = Object.keys(Data.years).sort((a: any, b: any) => b - a)

    public listLangs: any = Data.langs

    public objectOptions: any = {}

    public tableOptions: any = {
        values: '',
        langs: ''
    }

    public options: any = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: Data.months,
            crosshair: true
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        }
    }

    changeFilter(year: number, lang: string = 'JavaScript', visible = false, options: any) {
        options.xAxis.categories = Object.keys(Data.years[year])
        this.tableOptions.values = Object.keys(Data.years[year]).map((vl: any) => {
            return {
                month: vl + ' ' + year,
                value: Data.years[year][vl][lang].toFixed(1) + '%'
            }
        })
        this.tableOptions.langs = lang

        return Data.langs
            .map((lg: any) => {
                return {
                    name: lg,
                    data: options.xAxis.categories.map((mt: any) => Data.years[year][mt][lg]),
                    type: 'column',
                    visible
                }
            })
            .map((lg: any) => {
                if (lang === lg.name) {
                    lg.visible = true
                }
                return lg
            })
    }

    updateFilter(event: any, type: string) {
        switch (type) {
            case 'year':
                this.objectOptions.year = event.target.value
                this.objectOptions.lang = !this.objectOptions.lang ? 'JavaScript' : this.objectOptions.lang

                this.options.series = this.changeFilter(this.objectOptions.year, this.objectOptions.lang, false, this.options)
                Highcharts.chart('insights', this.options)
                break
            case 'lang':
                this.objectOptions.year = !this.objectOptions.year ? 2020 : this.objectOptions.year
                this.objectOptions.lang = event.target.value
                this.options.series = this.changeFilter(this.objectOptions.year, this.objectOptions.lang, false, this.options)
                Highcharts.chart('insights', this.options)
        }
    }

    ngOnInit(): void {
        this.options.series = this.changeFilter(2020, 'JavaScript', false, this.options)
    }

    ngAfterViewInit(): void {
        Highcharts.chart('insights', this.options)
    }

    years = Object.keys(Data).forEach((e) => e)
}
