import { Component, OnInit } from '@angular/core';
import { KgmlFilesService } from '../kgml-files.service';
import { MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material';

@Component({
  selector: 'app-kgml-files-list',
  templateUrl: './kgml-files-list.component.html',
  styleUrls: ['./kgml-files-list.component.css'],
  providers: [KgmlFilesService]
})
export class KgmlFilesListComponent implements OnInit {

  constructor(private service: KgmlFilesService) { }

  files: any = [];
  filesData: MatTableDataSource<any>;
  displayedColumns: string[] = ['File Name', 'Upload Date', 'Actions'];

  ngOnInit() {
    this.service.getAllKGMLFiles().subscribe(files => {
      this.files = files;
      this.filesData = new MatTableDataSource<any>(files as
      {_id: string, length: number, chunkSize: number, uploadDate: string, filename: string, md5: string, contentType: string}[]);
    })
  }

}
