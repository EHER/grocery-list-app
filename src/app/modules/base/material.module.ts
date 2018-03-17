// Angular imports
import { NgModule } from '@angular/core'

// Angular material imports
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatListModule, MatMenuModule, MatInputModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatListModule, MatMenuModule, MatInputModule
  ]
})
export class MaterialModule {}
