import { ChartReportDTO } from './../models/table-report/chart-report/chart-report.dto';
import { ChartReportsService } from './chart-reports/chart-reports.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Request, Body, Put, Param, Delete } from '@nestjs/common';
import { TableReportsService } from './table-reports.service';
import { TableReport } from '../data/entities/table-report.entity';
import { CreateTableReportDTO } from '../models/table-report/create-table-report.dto';
import { UpdateTableReportDTO } from '../models/table-report/update-table-report.dto';
import { ApiService } from './api.service';
import { ChartReport } from 'src/data/entities/chart-report.entity';
import { UpdateChartReportDTO } from '../models/table-report/chart-report/update-chart-report.dto';
import { CompareChartDTO } from 'src/models/table-report/chart-report/compare-chart.dto';

@Controller('table-reports')
export class TableReportsController {
  constructor(
    private readonly tableReportsService: TableReportsService,
    private readonly chartReportsService: ChartReportsService,
    private readonly apiService: ApiService,
  ) { }

/*   @Get()
  @UseGuards(AuthGuard())
  async allTableReports(): Promise<TableReport[]> {
    return await this.tableReportsService.getTableReports();
  } */

  @Get()
  @UseGuards(AuthGuard())
  async currentUserTableReports(@Request() req): Promise<TableReport[]> {
    return await this.tableReportsService.getCurrentUserTableReports(req.user);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Request() req, @Body() tableReportDTO: CreateTableReportDTO) {
    try {
      const tableReport = await this.tableReportsService.createTableReport(tableReportDTO, req.user);
      return tableReport;
      //return await this.apiService.tableReport(tableReport);
    } catch (error) {
       console.log(error.message)
    }
  }
  @Get(':id')
  @UseGuards(AuthGuard())
  async getTableById(@Param('id') id): Promise<string> {
    return await this.tableReportsService.getTableReportById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateTableById(@Request() req, @Param('id') tableReportId, @Body() updateTableReportDTO: UpdateTableReportDTO): Promise<string> {
    return await this.tableReportsService.updateTableById(req.user, tableReportId, updateTableReportDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteTableById(@Request() req, @Param('id') tableReportId): Promise<string> {
    console.log(req.user);
    console.log(tableReportId);
    
    
    return await this.tableReportsService.deleteTableById(req.user, tableReportId);
  }

  @Get(':tableReportId/chart-reports')
  @UseGuards(AuthGuard())
  async allChartReports(@Param('tableReportId') tableReportId: string): Promise<ChartReport[]> {
    const tableReport = await this.tableReportsService.getTableReportById(tableReportId);
    return tableReport.chartReports;
  }

  @Post(':tableReportId/chart-reports')
  @UseGuards(AuthGuard())
  async createChartReport(@Param('tableReportId') tableReportId: string, @Body() chartReportDTO: ChartReportDTO): Promise<string> {
    return await this.chartReportsService.createChartReport(tableReportId, chartReportDTO);
  }

  @Put(':tableReportId/chart-reports/:chartReportId')
  @UseGuards(AuthGuard())
  async updateChartReportById(
    @Request() req,
    @Param() params: any,
    @Body() updateChartReportDTO: UpdateChartReportDTO): Promise<string> {
    return await this.chartReportsService.updateChartReport(req.user, params.tableReportId, params.chartReportId, updateChartReportDTO);
  }

  //@Delete(':tableReportId/chart-reports/:chartReportId')
  @Delete('x/chart-reports/:chartReportId')
  @UseGuards(AuthGuard())
  async deleteChartReportById(
    @Request() req,
    @Param() params): Promise<ChartReport> {
    return await this.chartReportsService.deleteChartReportById(req.user, params.tableReportId, params.chartReportId);
  }

  @Post('x/compare-chart')
  @UseGuards(AuthGuard())
  async compareReport(@Body() compareChartDTO: CompareChartDTO): Promise<any[]> {
    return await this.apiService.chartReport(compareChartDTO);
  }
}